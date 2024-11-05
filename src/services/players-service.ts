import * as PlayerRepostory from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helpers";

export const getPlayerService = async () => {
  const data = await PlayerRepostory.findAllPlayers();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};


export const getPlayerByIdService = async (id: number) => {
  // pedir  pro repisotório de dados
  const data = await PlayerRepostory.findPlayerById(id);
  let response = null;

  if(data) {
    response = HttpResponse.ok(data);
  } else {
    response = HttpResponse.noContent();
  }

  return response;
};