import { response } from "express";
import { PlayerModel } from "../models/player-models";
import * as PlayerRepostory from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helpers";
import { StatisticsModel } from "../models/statistics-model";

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

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
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
    response = await HttpResponse.badRequest();
  }

  return response;
};

export const deletePlayerService = async (id: number) => {
  let response = null;
  await PlayerRepostory.deleteOnePlayer(id);

  response = HttpResponse.ok({ message: "deleted" });
  return response;
};

export const updatePlayerService = async (
  id: number,
  statistics: StatisticsModel
) => {
  const data = await PlayerRepostory.findAndModifyPlayer(id, statistics)
  let response = null;

  if (Object.keys(data).length === 0) {
    response = await HttpResponse.badRequest();
  } else {
    response = await HttpResponse.ok(data);
  }
  
  return response;
};
