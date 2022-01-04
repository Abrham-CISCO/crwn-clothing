import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import collectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, covertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { updateCollecitons } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';
const collectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage)

class ShopPage extends React.Component{
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;


    componentDidMount(){
        const {updateCollecitons} = this.props
        const collectionRef = firestore.collection('collections')
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async snapshot => {
                const collectionsMap = covertCollectionsSnapshotToMap(snapshot)
                updateCollecitons(collectionsMap)
                this.state({loading:false})
            }
        )


    }

    render(){
        const {match} = this.props;
        return (<div className='shop-page'>
        <Route exact path={`${match.path}`} component = {collectionsOverviewComponent}/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </div>)
    }
}
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollecitons(collectionMap))
})
export default connect(null,mapDispatchToProps)(ShopPage);