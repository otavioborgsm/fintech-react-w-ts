import React from 'react'
import useFetch from '../Hooks/useFetch';
import { formatDate } from '../util/DateFormatter';

interface IDataContext {
  loading: boolean;
  error: string | null;
  data: IVenda[] | null;
  inicio: string;
  final: string;
  setInicio: React.Dispatch<React.SetStateAction<string>>;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
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

function getDate(n: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() - n)
  return formatDate(date)
}

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [inicio, setInicio] = React.useState(getDate(30));
  const [final, setFinal] = React.useState(getDate());

  const { data, loading, error } = useFetch<IVenda[]>(`https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`);

  return <DataContext.Provider value={{ data, loading, error, inicio, setInicio, final, setFinal }}>{children}</DataContext.Provider>
}
