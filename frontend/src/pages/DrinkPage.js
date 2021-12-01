import React, { useEffect } from 'react'
import { listOfDrinks } from '../actions/drinkAction';
import DrinkPanel from '../components/DrinkPanel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'





export default function DrinkPage() {
    
    const dispatch = useDispatch();
    const drinkList = useSelector((state) => state.drinkList);
    const {loading, error, drinks} = drinkList;

    useEffect(()=>{
        window.scrollTo({
        top: 0, 
        });

        dispatch(listOfDrinks());
    }, [dispatch]);

    

    return (
        <div>
            <div>
                DRINKS
            </div>
            {
            loading ? (
                <LoadingBox></LoadingBox>
            ) :
            error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
                <div className="row center">
                {
                    drinks.map((d) => (
                    <DrinkPanel key={d._id} d = {d}>
                        
                    </DrinkPanel>
                    
                    ))}
                </div>)}
        </div>
    )
}
