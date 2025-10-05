import React, {useId} from 'react'

function Select({options,label,className,...props},ref) { // by default this options give an empty array.So to get the value we have to destructure it  and can use map method to get the value.
  const id = useId();

  return (
    <div className='w-full '>
      {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>}
      <select {...props} ref={ref} id={id} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}>

        {options?.map((option) => (
          <option key={option} value={option} label={option}>
            {option.label}
          </option>
        ))}



      </select>

    </div>
  )
}

export default React.forwardRef(Select)

