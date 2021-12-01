import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsOfDrink } from '../actions/drinkAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DrinkDetailPage(props) {

    const params = useParams();
    const id = params.drinkId;

    const dispatch = useDispatch();

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    const drinkDetail = useSelector((state)=> state.drinkDetail);
    const {loading, error, drink} = drinkDetail;

    useEffect(()=>{
        // dispatch({type: USER_FILTER_COMMENT_BY_STAR_RESET});
        // dispatch(getProductRating(productId));
        // if(userInfo)
        // {
        //     dispatch(detailsOfUser(userInfo._id));
        // }
        // setTimeout(()=>
        // {
        //     dispatch(detailsOfProduct(productId));
        //     dispatch(listOfComments(productId));
        //     dispatch(listOfUsers());
            
            
        //     dispatch(showRelatedProductList(productId));
        // }, 50); //time to delay so that i can execute the getProductRating first (update the rating field in Product) before getting productDetails
        dispatch(detailsOfDrink(id));
    }, [dispatch, id]);
    return (
        <div>
            {
                loading ? (
                <LoadingBox></LoadingBox>
            ) :
            error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
            <div>
            <div>
                <p id="top"><Link to="/drink"  className="linkButton">Quay về browse</Link></p>
                <div className="row center">
                    <label className="drink-Title">{drink.name}</label>
                </div>
                <div className="floatingDiv">
                    <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
                </div>
            </div>
            <div className="row top">
                <div className="col-2">
                    <img class="detailImage" src={drink.image} alt={drink.name}></img>
                    
                </div>
            
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>Tên: {drink.name}</h1>
                        </li>
                        {/* <li>
                            <Rating
                                rating={drink.rating}
                                reviewNum={drink.reviewNum}></Rating>
                        </li> */}
                        <li>
                        {/* {
                            loadingRating ? (<LoadingBox></LoadingBox>) : errorRating ? (<MessageBox variant="error">{errorRating}</MessageBox>) : 
                                successRating===true}
                            <Rating
                                rating={drink.rating}
                                reviewNum={drink.reviewNum}></Rating> */}

                        </li>
                        <li>
                            <label className="bold-text">Price:</label> ${drink.price}
                        </li>
                        <li>
                            <h1>Mô tả:</h1> <p>{drink.description}</p> 
                            {/* <p><Linkify>{drink.description}</Linkify></p> */}
                        </li>
                        <li>
                            <label className="bold-text">Loại:</label> {drink.type}
                        </li>
                        <li>
                        {/* {userInfo &&
                            (userInfo.isAdmin===true &&
                                (<div className="card card-body">
                                    <input type="text" hidden={tagEditBox} className="tagInput" onChange={(e)=>setTagContent(e.target.value)}></input>
                                    <button className="admin block" onClick={addTag} hidden={tagEditBox}>THÊM</button>
                                    <button className="admin block" onClick={enableTagEditBox}>
                                        {tagEditBox ? <label>THÊM TAG</label> : <label>ĐÓNG</label>}
                                    </button>
                                </div>))
                        } */}
                        </li>
                    </ul>
                </div>
            </div>
            </div>)}
        </div>
    )
}
