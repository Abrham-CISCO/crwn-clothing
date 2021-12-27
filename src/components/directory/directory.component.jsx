import React from "react";
import {connect} from 'react-redux'
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'
import {selectDirectorySection} from '../../redux/directory/directory.selectors'
import { createStructuredSelector} from 'reselect'
const Directory = ({sections}) => {
  return(
      <div cassName='directory-menu' style={

        {
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent:'space-between'

        }
      }>
          {sections.map(({id, ...otherSectionProps})=>(
              <MenuItem key={id} {...otherSectionProps}/>
          ))}
      </div> 
  )
}

const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySection
})
export default connect(mapStateToProps)(Directory);