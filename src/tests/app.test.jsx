import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../components/app/app'
import dataResponse from './data.mock.js'

const USERNAME_KEY = 'username'
const USERNAME_VALUE = 'test'
window.fetch = vi.fn()

const createFetchResponse = (data) => {
  return { json: () => new Promise(resolve => resolve(data)) }
}

describe('App test', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  beforeEach(() => {
    window.fetch.mockReset()
    render(<App/>)
  })

  afterEach(() => {
    sessionStorage.clear()
    setItemSpy.mockClear()
  })

  beforeEach(() => {
    window._virtualConsole.emit = vi.fn()
  })
  
  test('Should show a title and a button with text Jugar', () => {
    expect(screen.getAllByTestId('title')).toBeDefined()
    expect(screen.getByRole('button').textContent).toEqual('Jugar')
  })

  test('Should show a modal to enter the username when Jugar is clicked', () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByRole('dialog')).toBeDefined()
  })

  test('Should show an error message when the username form is submitted with empty fields', () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const modalButton = screen.getByText(/Comenzar/i)
    fireEvent.click(modalButton)
    expect(screen.getByText(/Por favor ingresa un nombre de usuario/i)).toBeDefined()
  })

  test('Should save username in session storage when the username form is submitted successfully', async () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const input = screen.getByTestId('username')

    fireEvent.change(input, { target: { value: USERNAME_VALUE } })
    const modalButton = screen.getByText(/Comenzar/i)
    fireEvent.click(modalButton)
    
    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(USERNAME_KEY, USERNAME_VALUE)
    })
  })

  test('Should call animals API before the game starts', async () => {
    fetch.mockResolvedValue(createFetchResponse(dataResponse))
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const input = screen.getByTestId('username')
    fireEvent.change(input, { target: { value: USERNAME_VALUE } })
    const modalButton = screen.getByText(/Comenzar/i)
    fireEvent.click(modalButton)

    await waitFor(() => {
      expect(window.fetch).toBeCalled()
      expect(window.fetch).toBeCalledTimes(1)
    })
  })

  test('Should show score with the hits and misses', async () => {
    fetch.mockResolvedValue(createFetchResponse(dataResponse))
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const input = screen.getByTestId('username')
    fireEvent.change(input, { target: { value: USERNAME_VALUE } })
    const modalButton = screen.getByText(/Comenzar/i)
    fireEvent.click(modalButton)

    await waitFor(() => {
      expect(screen.getByText(/Aciertos: 0/i)).toBeDefined()
      expect(screen.getByText(/Errores: 0/i)).toBeDefined()
    })
  })
})