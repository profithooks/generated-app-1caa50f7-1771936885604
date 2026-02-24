
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Task Management Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the main app correctly', () => {
    render(<App />);
    const headingElement = screen.getByText(/task management/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('adds a new task and displays it', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(inputElement, { target: { value: 'Test Task 1' } });
    fireEvent.click(buttonElement);

    const newTaskElement = screen.getByText(/test task 1/i);
    expect(newTaskElement).toBeInTheDocument();
  });

  test('marks a task as completed', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(inputElement, { target: { value: 'Test Task 2' } });
    fireEvent.click(buttonElement);

    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();
  });

  test('removes a task when delete button is clicked', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(inputElement, { target: { value: 'Test Task 3' } });
    fireEvent.click(buttonElement);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/test task 3/i);
    expect(taskElement).not.toBeInTheDocument();
  });
});
    