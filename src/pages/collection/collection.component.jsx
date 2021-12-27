import React from 'react'
import { connect } from 'react-redux'
import collectionItemComponent from '../../components/collection-item/collection-item.component'
import {selectCollection} from '../../redux/shop/shop.selectors'
import './collection.styles.scss'

const CollectionPage = ({collection}) => {
    const {title, items} = collection
 
 return(<div className='collection-pageS'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item=>
                    <collectionItemComponent key={item.id} item={item}/>)
            }
        </div>
    </div>)
}

//the second arguement ownProps is the props of the 
//wrapped component (CollectionPage)
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);