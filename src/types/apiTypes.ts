export interface BasicResponse {
  code: number;
  message: string;
}

export interface ILoginApiResponse {
  code: number;
  message: string;
  data?: {
    token?: string;
    role?: string;
    phone?: string;
  } | null;
}

export interface IStoredAuthSession {
  accessToken: string;
  expiresInSeconds: number | null;
  userId: string;
  username: string;
  email: string;
  role: string;
}

export interface ILoginRequest {
  userName: string;
  password: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber1: string;
  designation: string;
  password: string;
  confirmPassword: string;
}

export interface IStringifiedApiResponse<T> {
  code: number;
  message: string;
  data: string | T | null;
}

export interface IProfile {
  email?: string;
  name?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  address?: string;
  designation?: string;
  role?: string;
  photo?: string;
}

export interface IFlockListItem {
  flock_Id?: number;
  flock?: string;
  flock_Size?: number;
  age?: number;
  breed?: string;
  shed?: string;
  updated_Date?: string;
}

export type IFlockListResponse = IFlockListItem[];

export interface IPenListItem {
  FlockDetailsId?: number;
  Pen?: string;
}

export type IPenListResponse = IPenListItem[];

export interface IReportFlockListItem {
  id?: number;
  flockName?: string;
}

export type IReportFlockListResponse = IReportFlockListItem[];

export interface IReportPenListItem {
  id?: number;
  name?: string;
}

export type IReportPenListResponse = IReportPenListItem[];

export type IReportDetailsItem = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface IReportDetailsData {
  result?: string | IReportDetailsItem[];
}

export interface IStockWeeklyReportRequest {
  flockName: string;
  penId: number | string;
}

export interface IFlockFarmBookkeeping {
  flock_Pen_Id?: number;
  flockSize?: number;
  female_mortality_Number?: number;
  male_mortality_Number?: number;
  remaining_Chick?: number;
  bookkeepingId?: number;
  age?: number;
  [key: string]: string | number | undefined;
}

export interface IFlockFarmListItem {
  date?: string;
  flockName?: string;
  bookkeeping?: string | IFlockFarmBookkeeping;
}

export type IFlockFarmListResponse = IFlockFarmListItem[];

export interface IFeedProgramReportItem {
  ActualFemaleBodyWt?: number;
  ActualMaleBodyWt?: number;
  Week?: string;
  WeekIntNumber?: string;
  StdBodyFemaleWt?: number;
  StdBodyMaleWt?: number;
  DoctorPlacedStandardData?: string;
  Pen?: string;
  FlockName?: string;
  IsEditable?: number;
  FemaleDifference?: number;
  MaleDifference?: number;
  FemaleNumber?: number;
  MaleNumber?: number;
}

export interface IFeedProgramReportData {
  result?: string | IFeedProgramReportItem[];
}

export interface IFlockReportShedStatus {
  Breed?: string;
  shedName?: string;
  initial_Stock?: number;
}

export interface IFlockReportItem {
  shed_status?: string | IFlockReportShedStatus;
  age?: number;
  female_mortality_Number?: number;
  male_mortality_Number?: number;
  cum_Female_Mortality_Number?: number;
  cum_Male_Mortality_Number?: number;
  body_Weight?: number;
  female_feed_Consumption_in_Kg?: number;
  male_feed_Consumption_in_Kg?: number;
  feed_per_bird_female?: number;
  feed_per_bird_male?: number;
  opening_female_Birds?: number;
  opening_male_Birds?: number;
  closing_female_bird?: number;
  closing_male_bird?: number;
  light_At?: string;
  light_Duration?: number;
  std_feed_rate?: number;
  std_body_wt?: number;
  min_Temp?: number;
  max_Temp?: number;
}

export interface IRemAndDailyEgg {
  EggQty?: number;
  FemaleQty?: number;
  MaleQty?: number;
}

export interface IActiveFlockBookkeeping {
  closing_Female_birds?: number;
  closing_Male_birds?: number;
  shed_Name?: string;
  running_age?: number;
  feed_per_bird_female?: number;
  feed_per_bird_male?: number;
  female_mortality_Number?: number;
  male_mortality_Number?: number;
  bodyWeight?: number;
  female_mortality_percentage?: number;
  male_mortality_percentage?: number;
  cost_per_bird_female?: string | number;
  cost_per_bird_male?: string | number;
  running_cost_female?: string | number;
  running_cost_male?: string | number;
  total_feed_consumption_female?: number;
  total_feed_consumption_male?: number;
}

export interface IActiveFlockRawItem {
  flockname?: string;
  bookkeeping?: string | IActiveFlockBookkeeping;
}

export interface IActiveFlockItem {
  flockName: string;
  runningAge: number | string;
  shedName: string;
  weight: number | string;
  closingFemaleBirds: number | string;
  closingMaleBirds: number | string;
  femaleMortalityNumber: number | string;
  maleMortalityNumber: number | string;
  femaleMortalityPercentage: number | string;
  maleMortalityPercentage: number | string;
  feedPerBirdFemale: number | string;
  feedPerBirdMale: number | string;
  totalFeedConsumptionFemale: number | string;
  totalFeedConsumptionMale: number | string;
  costPerBirdFemale: number | string;
  costPerBirdMale: number | string;
  runningCostFemale: number | string;
  runningCostMale: number | string;
}

export type IActiveListResponse = IActiveFlockItem[];

export interface ISalesReportItem {
  salesid?: number;
  invoice_no?: string;
  payment_type?: string;
  customer_name?: string;
  total_amount?: number;
  discount_amount?: number;
  discount_percentage?: number;
  vat_amount?: number;
  net_amount?: number;
  status?: string;
}

export interface ISalesReportDateGroup {
  invoice_date?: string;
  sales?: ISalesReportItem[];
}

export type ISalesReportListResponse = ISalesReportDateGroup[];

export interface ISalesDetailsItem {
  products?: string;
  quantity?: number;
  bonusQuantity?: number;
  rate?: number;
  total_amount?: number;
  discount_amount?: number;
  net_amount?: number;
  flock?: string;
}

export type ISalesDetailsResponse = ISalesDetailsItem[];
