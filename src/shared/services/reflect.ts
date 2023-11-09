import type { ReflectServerOptions } from "@rocicorp/reflect/server"
import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Reflect } from "@rocicorp/reflect/client"
import { z } from "zod"

export const cursorSchema = z.union([
  z.object({
    x: z.number(),
    y: z.number(),
  }),
  z.null(),
])

const userInfoSchema = z.object({
  name: z.string(),
  avatar: z.union([z.string(), z.null()]),
})

const clientStateSchema = z.object({
  id: z.string(),
  cursor: cursorSchema,
  userInfo: userInfoSchema,
})

function getParse<T>(schema: z.Schema<T>) {
  return process.env.NODE_ENV !== "production" ? schema.parse : (val: T) => val
}

export const {
  init: initClientState,
  get: getClientState,
  update: updateClientState,
} = generate("client-state", getParse(clientStateSchema))

async function setCursor(
  tx: WriteTransaction,
  coordinates: z.infer<typeof cursorSchema>
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, cursor: coordinates })
}

async function setUserInfo(
  tx: WriteTransaction,
  userInfo: { name: string; avatar: string | null }
): Promise<void> {
  await updateClientState(tx, {
    id: tx.clientID,
    userInfo,
  })
}

export const mutators = { initClientState, setCursor, setUserInfo }

export type ReflectMutators = typeof mutators
export type ReflectInstance = Reflect<ReflectMutators>

const makeOptions = (): ReflectServerOptions<ReflectMutators> => ({
  mutators,
  logLevel: "debug",
})

export default makeOptions