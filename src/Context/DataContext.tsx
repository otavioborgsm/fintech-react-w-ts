import React from 'react'
import useFetch from '../Hooks/useFetch';

interface IDataContext {
  loading: boolean;
  error: string | null;
  data: IVenda[] | null;
}

interface IVenda {
  id: string;
  nome: string;
  preco: number;
  status: Status;
  pagamento: Pagamento;
  parcelas: null | number;
  data: string;
}

type Pagamento = "boleto" | "cartao" | "pix";
type Status = "pago" | "processando" | "falha";

const DataContext = React.createContext<IDataContext | null>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) { throw new Error('useData precisa estar em DataContextProvider') }

  return context;
}

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const { data, loading, error } = useFetch<IVenda[]>('https://data.origamid.dev/vendas/');

  return <DataContext.Provider value={{ data, loading, error }}>{children}</DataContext.Provider>
}
