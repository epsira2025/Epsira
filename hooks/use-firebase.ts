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
