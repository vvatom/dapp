import { getEligibility } from "shared/utils"
import { setEligibility, setHasClaimed } from "redux-state/slices/claim"
import { hasAlreadyClaimed, claim } from "shared/contracts"
import createDappAsyncThunk from "../asyncThunk"

export const fetchEligibility = createDappAsyncThunk(
  "claim/fetchEligibility",
  async (_, { dispatch, getState }) => {
    const {
      claim: { address },
    } = getState()

    if (!address) {
      throw Error("No address to fetch eligibility for")
    }

    const eligibility = await getEligibility(address)

    dispatch(setEligibility({ eligibility }))
  }
)

export const fetchHasClaimed = createDappAsyncThunk(
  "claim/fetchHasClaimed",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      claim: { eligibility },
    } = getState()

    const hasClaimed = eligibility
      ? await transactionService.read(hasAlreadyClaimed, { eligibility })
      : false

    dispatch(setHasClaimed({ hasClaimed }))
  }
)

export const claimTaho = createDappAsyncThunk(
  "claim/claim",
  async (_, { getState, extra: { transactionService } }) => {
    const {
      claim: { eligibility },
    } = getState()

    if (!eligibility) {
      throw Error("No eligibility to claim")
    }

    await transactionService.send(claim, { eligibility })
  }
)
