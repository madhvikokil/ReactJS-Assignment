export const updatedObject = (oldObject, updatedValue) => {
    return{
        ...oldObject,
        ...updatedValue
    }
}