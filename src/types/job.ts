// Job data types for GovCon Jobs Board

export type JobCategory =
  | 'proposal-coordinator'
  | 'pricing-analyst'
  | 'contracts-administrator'
  | 'capture-manager'
  | 'bd-manager'
  | 'proposal-manager'
  | 'capture-director'
  | 'vp-business-development'
  | 'bd-consultant'
  | 'other';

export type JobSource = 'usajobs' | 'prime';

export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  locationCity?: string;
  locationState?: string;
  salary_min: number | null;
  salary_max: number | null;
  grade: string | null;
  clearance: string | null;
  remote: boolean;
  posted_date: string;
  close_date: string;
  apply_url: string;
  description: string;
  qualifications: string;
  category: JobCategory;
  source: JobSource;
}

export interface JobSearchParams {
  keyword?: string;
  location?: string;
  category?: JobCategory;
  salaryMin?: number;
  salaryMax?: number;
  clearance?: string;
  remote?: boolean;
  page?: number;
  limit?: number;
}

export interface JobSearchResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

// Category metadata for display and SEO
export interface CategoryInfo {
  slug: JobCategory;
  name: string;
  shortName: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  certificationWeeks: number[];
  keywords: string[];
}

// USAJobs API response types
export interface USAJobsSearchResult {
  SearchResult: {
    SearchResultCount: number;
    SearchResultCountAll: number;
    SearchResultItems: USAJobsItem[];
  };
}

export interface USAJobsItem {
  MatchedObjectId: string;
  MatchedObjectDescriptor: {
    PositionID: string;
    PositionTitle: string;
    PositionURI: string;
    ApplyURI: string[];
    PositionLocation: {
      LocationName: string;
      CountryCode: string;
      CountrySubDivisionCode: string;
      CityName: string;
    }[];
    OrganizationName: string;
    DepartmentName: string;
    JobCategory: {
      Name: string;
      Code: string;
    }[];
    JobGrade: {
      Code: string;
    }[];
    PositionSchedule: {
      Name: string;
      Code: string;
    }[];
    PositionOfferingType: {
      Name: string;
      Code: string;
    }[];
    QualificationSummary: string;
    PositionRemuneration: {
      MinimumRange: string;
      MaximumRange: string;
      RateIntervalCode: string;
      Description: string;
    }[];
    PositionStartDate: string;
    PositionEndDate: string;
    PublicationStartDate: string;
    ApplicationCloseDate: string;
    UserArea: {
      Details: {
        JobSummary: string;
        MajorDuties?: string[];
        WhoMayApply?: {
          Name: string;
          Code: string;
        };
        LowGrade?: string;
        HighGrade?: string;
        TeleworkEligible?: boolean;
        SecurityClearance?: string;
      };
    };
  };
}
