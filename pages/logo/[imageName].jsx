import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Styled = styled.div`
  padding: 10rem;
  display: flex;
  width: 100%;
  align-items: center;
  background: #ececec;
`

const Image = () => {
  const router = useRouter()
  const { imageName, imageURL } = router.query

  return (
    <Styled>
      <img src={imageURL} alt={imageName} />
    </Styled>
  )
}

export default Image
