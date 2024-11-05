import { response } from "express";
import { PlayerModel } from "../models/player-models";
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

export const createPlayerService = async (player: PlayerModel) => {
  let response = null;

  //verifica se está vazio
  if (Object.keys(player).length !== 0) {
    await PlayerRepostory.insertPlayer(player);
    response = await HttpResponse.created();
  } else {
    response = HttpResponse.badRequest();
  }

  return response
}

export const deletePlayerService = async (id: number) => {
  let response = null;
  await PlayerRepostory.deleteOnePlayer(id);

  response = HttpResponse.ok({message: "deleted"})
  return response;
}
