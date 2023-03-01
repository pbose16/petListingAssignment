import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerDetails } from '../ApiIntegrationRTK/ownerSlice'
import { getUniqueAttributeValue, getPetList } from '../Utility/getObjectValues'
import { attributeName, defaultPetCategory } from '../ConfigConstants/constants'
import { PetListContainer, DisplayContainer } from '../View/styles'

export const PetListing = () => {
  /**
   * @description Selector and Dispatcher Declarations
   */
  const dispatch = useDispatch()
  const {
    isFetchOwnerDataInitiated,
    isFetchOwnerDataSuccessful,
    isFetchOwnerDataError,
    ownerDetails
  } = useSelector((state) => state.ownerDetails)

  /**
   * @description State Declarations
   */
  const [groupingAttribute, setGroupingAttribute] = useState(null)

  /**
   * @description UseEffect definitions
   */
  useEffect(() => {
    dispatch(getOwnerDetails())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (isFetchOwnerDataSuccessful && ownerDetails) {
      setGroupingAttribute(getUniqueAttributeValue(ownerDetails, attributeName))
    }
    //eslint-disable-next-line
  }, [isFetchOwnerDataSuccessful])

  /**
   * @description Display Function to render the pet name on basis of attribute
   */
  const displayPetList = (ownerAttributeValue, index, petCategory = defaultPetCategory) => {
    const petList = getPetList(ownerDetails, attributeName, ownerAttributeValue, petCategory)
    return (
      <PetListContainer key={index}>
        <h4>{ownerAttributeValue}</h4>
        {petList?.map((item, index) => (
          <label key={index}>{item}</label>
        ))}
      </PetListContainer>
    )
  }

  return (
    <Fragment>
      {isFetchOwnerDataInitiated && (
        <label data-testid='data-fetch-loader'>Fetching Information...</label>
      )}
      {isFetchOwnerDataSuccessful && !isFetchOwnerDataError && groupingAttribute && (
        <DisplayContainer data-testid='pet-display-container'>
          {groupingAttribute?.map((value, index) => {
            return displayPetList(value, index)
          })}
        </DisplayContainer>
      )}
      {isFetchOwnerDataError && !isFetchOwnerDataSuccessful && (
        <label data-testid='data-fetch-error'>Error Fetching Data...</label>
      )}
    </Fragment>
  )
}
