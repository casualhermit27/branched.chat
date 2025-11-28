
export interface Node {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label?: string;
  parentId?: string;
  active?: boolean;
  delay?: number;
  type?: 'input' | 'ai';
  color?: string;
  icons?: string[];
}

export enum WaitlistStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
