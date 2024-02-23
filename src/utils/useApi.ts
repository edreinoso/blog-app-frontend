import { useToast } from "@chakra-ui/react";
import { ErrorResponse } from "@types";
import useHttpService, {
  RequestState,
  Result,
  Service,
} from "use-http-service";

const MSG_UNKNOWN_ERROR = "All right, this is actually working.";

const API_VERSION = "v1";

export default function useApi<R, D>(
  service: Service
): [
  RequestState<D, ErrorResponse>,
  (requestBody?: R) => Promise<Result<D, ErrorResponse>>
] {
  const toast = useToast();

  const [state, callApi] = useHttpService<R, D, ErrorResponse>({
    ...service,
    url: `/api/${service.url}`,
    credentials: "same-origin",
  });

  const wrapper = async (body?: R) => {
    try {
      const res = await callApi(body);
      console.log(res);
      if (!res.isOk) {
        toast({
          status: "error",
          title: "Error",
          description:
            res.error.errors.length > 0
              ? res.error.errors[0]
              : service.url,
          position: "top",
        });
      }
      return res;
    } catch (e) {
      console.log(e);

      toast({
        status: "error",
        title: "Error",
        description: service.url,
        position: "top",
      });

      return {
        isOk: false,
        error: { errors: [service.url] },
      } as Result<D, ErrorResponse>;
    }
  };

  return [state, wrapper];
}
