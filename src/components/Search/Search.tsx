import React, { useEffect, useState } from 'react';

type SearchPropsType = {
  value: string
  onSubmit: () => void
}

export const Search = (props: SearchPropsType) => {

  const [tempSearch, setTempsearch] = useState(props.value);

  useEffect(() => {
    setTempsearch(props.value)
  }, [props.value])

  return (
    <div>
      <input placeholder='search' value={tempSearch} onChange={(e) => setTempsearch(e.currentTarget.value)}/>
      <button onClick={() => {props.onSubmit(tempSearch)}}>find</button>
    </div>
  )
}
