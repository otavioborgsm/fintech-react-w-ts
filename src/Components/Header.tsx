import React from 'react'
import DateRange from './DateRange'
import Meses from './Meses'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();

  const title =
    location.pathname === '/'
      ? 'Resumo'
      : location.pathname === '/vendas'
      ? 'Vendas'
      : '';

  React.useEffect(() => {
    document.title = `Fintech | ${title}`;
  }, [title]);

  return (
    <header className='mb'>
      <div className='daterange mb'>
        <DateRange />
        <h1 className='box bg-3'>{title}</h1>
      </div>
      <div>
        <Meses />
      </div>
    </header>
  )
}

export default Header