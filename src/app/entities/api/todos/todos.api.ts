import { Todo } from '@/modules/todos';
import { todoApi } from '@/entities/api';

export const getTodos = async (): Promise<Todo[]> => {
  return todoApi.get<Todo[]>('/todos');
};