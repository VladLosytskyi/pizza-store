import { FC, memo, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/hooks'
import { selectCurrentSort, selectSorts, setCurrentSort } from '../../redux-toolkit/slices/filterSlice'


const Sorts: FC = memo(() => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const sorts = useAppSelector(selectSorts)
  const currentSort = useAppSelector(selectCurrentSort)

  const sortRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const onSortClick = (sort: number) => {
    dispatch(setCurrentSort(sort))
    setIsPopupVisible(false)
  }

  const onOutOfSortClick = (event: MouseEvent) => {
    !event.composedPath().includes(sortRef.current) && setIsPopupVisible(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', onOutOfSortClick)

    return () => document.body.removeEventListener('click', onOutOfSortClick)
  }, [])

  return (
    <div className="sort" ref={ sortRef }>
      <div className="sort__label" onClick={ () => setIsPopupVisible(!isPopupVisible) }>
        <svg className={ isPopupVisible ? 'active' : undefined } width="10" height="6" viewBox="0 0 10 6" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#232323" />
        </svg>
        <b>Sort by:</b>
        <span>{
          sorts[currentSort].sortName
        }</span>
      </div>
      {
        isPopupVisible
        && <div className="sort__popup">
          <ul>
            { sorts.map(
              (sort, index) =>
                <li className={ sorts[currentSort].sortName === sort.sortName && 'active' }
                    onClick={ () => onSortClick(sort.id) }
                    key={ index }>{ sort.sortName }</li>
            ) }
          </ul>
        </div>
      }
    </div>
  )
})

export default Sorts