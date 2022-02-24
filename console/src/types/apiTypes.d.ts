interface Item {
  name: string;
  wallet: string;
  id: string;
  delete: string;
}

interface ApiKey {
  client_id: string;
  client_secret: string;
}

export interface Service {
  id: string;
  uid: string;
  name: string;
  serviceWallet: string;
  created_at: string;
  updated_at: string;
}
