import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import collectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, covertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { updateCollecitons } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';
const collectionsOverviewWithSpinner = withSpinner(collectionsOverviewComponent);
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
        const { loading } = this.state;
        return (<div className='shop-page'>
            {/* render props is used to pass params to the component */}
        <Route exact path={`${match.path}`} render = {(props) => <collectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
        <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
    </div>)
    }
}
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollecitons(collectionMap))
})
export default connect(null,mapDispatchToProps)(ShopPage);