'use client'

import useSWR from 'swr'
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'

export interface Journal {
  id: string
  title: string
  author: string
  abstract: string
  publicationDate: string
  googleDriveUrl: string
  coverImageUrl?: string
  createdAt?: Date
}

export interface Newsletter {
  id: string
  title: string
  description: string
  publicationDate: string
  googleDriveUrl: string
  coverImageUrl?: string
  createdAt?: Date
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl?: string
  createdAt?: Date
}

async function fetchJournals(): Promise<Journal[]> {
  const journalsRef = collection(db, 'journals')
  const q = query(journalsRef, orderBy('publicationDate', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Journal[]
}

async function fetchNewsletters(): Promise<Newsletter[]> {
  const newslettersRef = collection(db, 'newsletters')
  const q = query(newslettersRef, orderBy('publicationDate', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Newsletter[]
}

async function fetchEvents(): Promise<Event[]> {
  const eventsRef = collection(db, 'events')
  const q = query(eventsRef, orderBy('date', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[]
}

export function useJournals() {
  const { data, error, isLoading, mutate } = useSWR('journals', fetchJournals)
  return {
    journals: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useNewsletters() {
  const { data, error, isLoading, mutate } = useSWR('newsletters', fetchNewsletters)
  return {
    newsletters: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useEvents() {
  const { data, error, isLoading, mutate } = useSWR('events', fetchEvents)
  return {
    events: data || [],
    isLoading,
    error,
    mutate,
  }
}

export async function addJournal(journal: Omit<Journal, 'id'>) {
  const journalsRef = collection(db, 'journals')
  const docRef = await addDoc(journalsRef, {
    ...journal,
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateJournal(id: string, journal: Partial<Journal>) {
  const journalRef = doc(db, 'journals', id)
  await updateDoc(journalRef, journal)
}

export async function deleteJournal(id: string) {
  const journalRef = doc(db, 'journals', id)
  await deleteDoc(journalRef)
}

export async function addNewsletter(newsletter: Omit<Newsletter, 'id' | 'createdAt'>) {
  const newslettersRef = collection(db, 'newsletters')
  const docRef = await addDoc(newslettersRef, {
    title: newsletter.title,
    description: newsletter.description,
    publicationDate: newsletter.publicationDate,
    googleDriveUrl: newsletter.googleDriveUrl,
    coverImageUrl: newsletter.coverImageUrl || '',
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateNewsletter(id: string, newsletter: Partial<Newsletter>) {
  const newsletterRef = doc(db, 'newsletters', id)
  const data: any = {}
  
  if (newsletter.title) data.title = newsletter.title
  if (newsletter.description) data.description = newsletter.description
  if (newsletter.publicationDate) data.publicationDate = newsletter.publicationDate
  if (newsletter.googleDriveUrl) data.googleDriveUrl = newsletter.googleDriveUrl
  if (newsletter.coverImageUrl !== undefined) data.coverImageUrl = newsletter.coverImageUrl || ''
  
  await updateDoc(newsletterRef, data)
}

export async function deleteNewsletter(id: string) {
  const newsletterRef = doc(db, 'newsletters', id)
  await deleteDoc(newsletterRef)
}

export async function addEvent(event: Omit<Event, 'id'>) {
  const eventsRef = collection(db, 'events')
  const docRef = await addDoc(eventsRef, {
    ...event,
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateEvent(id: string, event: Partial<Event>) {
  const eventRef = doc(db, 'events', id)
  await updateDoc(eventRef, event)
}

export async function deleteEvent(id: string) {
  const eventRef = doc(db, 'events', id)
  await deleteDoc(eventRef)
}
