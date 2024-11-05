import * as PlayerRepostory from "../repositories/players-repository";
import { noContent, ok } from "../utils/http-helpers";

export const getPlayerService = async () => {
  const data = await PlayerRepostory.findAllPlayers();
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await noContent();
  }
  return response;
};
