const normalizeTime = value => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.replace(/[^\d]/g, '')
     
    if (onlyNums.length <= 4) {
      return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2)}`
    } 

  }
  
  export default normalizeTime