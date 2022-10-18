export interface List {
  ok:  boolean;
  msg: Msg;
}

export interface Msg {
  info:   Info;
  vessel: Vessel[];
}

export interface Info {
  vessels:    number;
  pages:      number;
  actualPage: number;
}

export interface Vessel {
  _id:                     string;
  String?:                 String;
  coords:                  boolean;
  photoReal:               boolean;
  Beam_m?:                 string;
  Builder?:                String;
  Built:                   string;
  Classification_Society?: String;
  Crude_Oil_bbl?:          String;
  DWT?:                    number;
  Distance__Time?:         String;
  Draught_m?:              String;
  Flag?:                   String;
  GT:                      number;
  Gas_m3?:                 String;
  Grain?:                  String;
  Gross_Tonnage?:          string;
  Homeport?:               String;
  IMO_number?:             string;
  Lat?:                    number;
  Length_Overall_m?:       string;
  Lon?:                    number;
  Manager?:                string;
  Photo:                   string;
  Place_of_Built?:         String;
  Predicted_ETA?:          String;
  Registered_Owner?:       string;
  Ship_type?:              string;
  Size_m:                  string;
  Source:                  string;
  Summer_Deadweight_t?:    string;
  TEU?:                    String;
  Vessel_Name?:            string;
  Yard?:                   String;
  Year_of_Built?:          number;
}
