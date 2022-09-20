import { GenericState } from "@/src/models";

export interface GasOracle {
  lastBlock: string;
  safeGasPrice: string;
  proposeGasPrice: string;
  fastGasPrice: string;
}

export interface GasOracleState extends GenericState<GasOracle> {
  selectedGasFee: string | null;
  gasLimit: number;
}
