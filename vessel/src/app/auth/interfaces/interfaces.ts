

export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface UpdateResponse {
  ok: boolean;
  msg: coors;
}

export interface coors {
  lat: number,
  lon: number
}

export interface Usuario {
    uid: string;
    name: string;
    email: string;
}
