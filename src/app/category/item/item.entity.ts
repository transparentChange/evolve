export interface Item {
    id: number;
    title: string;
    url: string;
    dateAdded: string;
    expiryDate: string;
    location: string;
    periodHours: number;
    status: string;
  }

  export enum Status {
    NEW = "NEW",
    VISITED = "VISITED",
    COMPLETED = "COMPLETED" 
  }