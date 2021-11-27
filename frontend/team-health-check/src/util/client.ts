import fetch, { RequestInit, Response } from 'node-fetch';

export const ClientConfig: {
  baseEndpoint: string | null;
  headers: RequestInit['headers'];
} = {
  baseEndpoint: '/api',
  headers: undefined,
};

interface ApiError {
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

const ApiFetch = {
  getEndpoint(route: string) {
    if (ClientConfig.baseEndpoint) {
      return `${ClientConfig.baseEndpoint}${route}`;
    }
    return route;
  },

  async generateError(response: Response, asText = false): Promise<ApiError> {
    return {
      status: response.status,
      statusText: response.statusText,
      body: asText ? await response.text() : await response.json(),
    };
  },

  async fetch<Res, Body extends {} | undefined = undefined>(
    route: string,
    method: RequestInit['method'],
    body?: Body,
  ) {
    const response = await fetch(this.getEndpoint(route), {
      method,
      headers: {
        ...(ClientConfig.headers || {}),
        'content-type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      return this.generateError(
        response,
        !response.headers.get('content-type')?.includes('application/json'),
      );
    }

    if (response.status === 204) {
      return undefined as unknown as Res;
    }

    return (await response.json()) as Res;
  },
};

export const isErrorResponse = <T, K = Exclude<T, ApiError>>(
  response: K | ApiError,
): response is ApiError => {
  const r = response as ApiError;

  if (!r) {
    return false;
  }

  return !!(r.status && r.statusText);
};

export interface LoginResponse {
  iat: number;
  exp: number;
}

export const LoginService = {
  login: () => ApiFetch.fetch<LoginResponse>('/login', 'GET'),
};

export type ResponseValues = 'thumbsUp' | 'thumbsDown' | 'shrug';

export interface SetResponseRequest {
  response: ResponseValues;
}

export interface UserResponseItem {
  id: string;
  question: string;
  response: ResponseValues | null;
}

export interface GetUserResponsesResponse {
  responses: UserResponseItem[];
}

export const ResponsesService = {
  setResponse: (questionId: string, body: SetResponseRequest) =>
    ApiFetch.fetch<undefined, SetResponseRequest>(
      `/responses/${questionId}`,
      'PUT',
      body,
    ),
  getUserResponses: (surveyId: string) =>
    ApiFetch.fetch<GetUserResponsesResponse>(
      `/responses/survey/${surveyId}`,
      'GET',
    ),
};

export interface CreateSurveyRequest {
  teamId: string;
  maxResponses?: number | null;
}

export interface Question {
  id: string;
  question: string;
}

export interface Team {
  id: string;
  displayName: string;
}

export interface CreateSurveyResponse {
  id: string;
  createdOn: number;
  active: boolean;
  questions: Question[];
  team: Team;
  maxResponses: number | null;
}

export interface GetSurveyResponse {
  id: string;
  createdOn: number;
  questions: Question[];
  team: Team;
  active: boolean;
  maxResponses: number | null;
}

export interface EditSurveyRequest {
  active?: boolean;
  maxResponses?: number | null;
}

export interface SurveySummary {
  id: string;
  createdOn: number;
  active: boolean;
}

export interface GetTeamSurveysResponse {
  surveys: SurveySummary[];
}

export interface SurveyResponseItem {
  id: string;
  question: string;
  responses: ResponseValues[];
}

export interface GetSurveyResponsesResponse {
  responses: SurveyResponseItem[];
}

export const SurveysService = {
  createSurvey: (body: CreateSurveyRequest) =>
    ApiFetch.fetch<CreateSurveyResponse, CreateSurveyRequest>(
      '/surveys',
      'POST',
      body,
    ),
  getSurvey: (surveyId: string) =>
    ApiFetch.fetch<GetSurveyResponse>(`/surveys/${surveyId}`, 'GET'),
  updateSurvey: (surveyId: string) =>
    ApiFetch.fetch<undefined, EditSurveyRequest>(
      `/surveys/${surveyId}`,
      'PATCH',
    ),
  getTeamSurveys: (teamId: string) =>
    ApiFetch.fetch<GetTeamSurveysResponse>(`/surveys/team/${teamId}`, 'GET'),
  getSurveyResponses: (surveyId: string) =>
    ApiFetch.fetch<GetSurveyResponsesResponse>(
      `/surveys/${surveyId}/responses`,
      'GET',
    ),
};

export interface GetTeamsResponse {
  teams: Team[];
}

export type CreateTeamResponse = Team;

export const TeamsService = {
  getTeams: () => ApiFetch.fetch<GetTeamsResponse>('/teams', 'GET'),
  createTeam: () => ApiFetch.fetch<CreateTeamResponse>('/teams', 'POST'),
};
