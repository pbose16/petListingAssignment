/* eslint-disable array-callback-return */

/**
 * @description Function to retireve the unique set of attribute values
 */
const getUniqueAttributeValue = (ownerDetails, attributeName) => {
  let uniqueAttributeValue = null
  if (ownerDetails && attributeName) {
    uniqueAttributeValue = [...new Set(ownerDetails.map((item) => item[attributeName]))]
  }
  return uniqueAttributeValue
}

/**
 * @description Function to filter out the pet name is alphabetical order
 */
const getPetList = (ownerDetails, ownerAttribute, ownerAttributeValue, petCategory) => {
  if (ownerDetails && ownerAttribute) {
    let petNames = []
    const petList = ownerDetails
      .filter((item) => {
        return item[ownerAttribute] === ownerAttributeValue
      })
      ?.map((item) => {
        if (item?.pets?.length) return item?.pets
      })
    if (petList?.length) {
      petList.forEach((element) => {
        petNames.push(
          element?.map((item) => {
            if (item?.type?.toLowerCase() === petCategory) return item.name
          })
        )
      })
    }
    return petNames?.flatMap((item) => item)?.sort()
  }
}

export { getUniqueAttributeValue, getPetList }
