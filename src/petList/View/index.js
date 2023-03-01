import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOwnerDetails } from '../ApiIntegration/ActionCreators.js'
import { getUniqueAttributeValue, getPetList } from '../Utility/getObjectValues.js'
import { attributeName, defaultPetCategory } from '../ConfigConstants/constants.js'
import { PetListContainer, DisplayContainer } from '../View/styles'

const PetListing = (props) => {
  const {
    isFetchOwnerDataInitiated,
    isFetchOwnerDataSuccessful,
    isFetchOwnerDataError,
    fetchOwnerDetails,
    ownerDetails
  } = props

  /**
   * @description State Declarations
   */
  const [groupingAttribute, setGroupingAttribute] = useState(null)

  /**
   * @description UseEffect definitions
   */
  useEffect(() => {
    fetchOwnerDetails()
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
PetListing.propTypes = {
  isFetchOwnerDataInitiated: PropTypes.bool,
  isFetchOwnerDataSuccessful: PropTypes.bool,
  isFetchOwnerDataError: PropTypes.bool,
  ownerDetails: PropTypes.array,
  fetchOwnerDetails: PropTypes.func
}

PetListing.defaultProps = {
  isFetchOwnerDataInitiated: false,
  isFetchOwnerDataSuccessful: false,
  isFetchOwnerDataError: false,
  ownerDetails: {},
  fetchOwnerDetails: () => {}
}

const mapStateToProps = (state) => {
  const {
    isFetchOwnerDataInitiated,
    isFetchOwnerDataSuccessful,
    isFetchOwnerDataError,
    ownerDetails
  } = state?.ownerDetailsStore || {}
  return {
    isFetchOwnerDataInitiated,
    isFetchOwnerDataSuccessful,
    isFetchOwnerDataError,
    ownerDetails
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwnerDetails: () => dispatch(getOwnerDetails())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PetListing)
