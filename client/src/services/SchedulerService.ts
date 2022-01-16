import { AxiosError } from "axios";

import axiosClient from "../lib/axios";
import {
  Scheduler,
  GetScheduler,
  GetSchedulerAPIResponse,
  GetSchedulers,
  GetSchedulersAPIResponse,
  Success,
} from "../lib/types";

export const getSchedulers = async (): Promise<GetSchedulers> => {
  try {
    const { data } = await axiosClient.get<GetSchedulersAPIResponse>(
      `/schedulers/`
    );
    return {
      schedulers: data.schedulers || [],
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while fetching schedulers.";
    }
    return {
      schedulers: [],
      error,
    };
  }
};

export const getSchedulerById = async (id: string): Promise<GetScheduler> => {
  try {
    const { data } = await axiosClient.get<GetSchedulerAPIResponse>(
      `/schedulers/${id}`
    );
    return {
      scheduler: data.scheduler || null,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while fetching schedulers.";
    }
    return {
      scheduler: null,
      error,
    };
  }
};

export const createScheduler = async (
  newScheduler: Scheduler
): Promise<Success> => {
  try {
    await axiosClient.post("/schedulers/", newScheduler);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the scheduler.";
    }
    return {
      success: false,
      error,
    };
  }
};

export const updateScheduler = async (
  updatedScheduler: Scheduler
): Promise<Success> => {
  try {
    await axiosClient.put(
      `/schedulers/${updatedScheduler.id}`,
      updatedScheduler
    );

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the scheduler.";
    }
    return {
      success: false,
      error,
    };
  }
};

export const deleteScheduler = async (id: string) => {
  try {
    await axiosClient.delete(`/schedulers/${id}`);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the scheduler.";
    }
    return {
      success: false,
      error,
    };
  }
};
