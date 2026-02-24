
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import AddTask from './AddTask';

describe('Task Management Tests', () => {
  test('renders TaskList component', () => {
    render(<TaskList />);
    const taskListElement = screen.getByText(/task list/i);
    expect(taskListElement).toBeInTheDocument();
  });

  test('can add a new task', () => {
    render(<AddTask />);
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(buttonElement);

    const taskElement = screen.getByText(/new task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('checks task completion toggle', () => {
    render(<TaskList />);
    const toggleButton = screen.getByRole('checkbox', { name: /task 1/i });
    
    fireEvent.click(toggleButton);
    expect(toggleButton.checked).toBe(true);
    
    fireEvent.click(toggleButton);
    expect(toggleButton.checked).toBe(false);
  });

  test('renders correct number of tasks', () => {
    render(<TaskList />);
    const taskItems = screen.getAllByRole('listitem');
    expect(taskItems.length).toBe(3); // Adjust based on initial task count
  });
});
    