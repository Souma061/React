import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
},ref){
  const id = useId();
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label htmlFor={id} className='mb-1 font-medium'>{label}</label>}
      <input id={id} type={type} ref={ref} className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' {...props} />
    </div>
  )
})
export default Input

