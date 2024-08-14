import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";
import { useEffect } from "react";
import { useContext } from "react";

export default function Details(){

    const {id}=useParams()
    const{recipeDetailsData,setRecipeDetailsData,handleAddToFavorite,favoriteList}=useContext(GlobalContext)
    

    useEffect(()=>{
            async function getRecipeDetails()
            {
                const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
                const data=await response.json();

                console.log(data);
                if(data?.data)
                {
                    setRecipeDetailsData(data?.data);
                }
            }
            getRecipeDetails();
    },[])

    return <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="row-start-2 lg:row-start-auto">
            <div className="h-96 overflow-hidden rounded-xl group">
                <img src={recipeDetailsData?.recipe?.image_url} 
                    className="w-full h-full object-cover block group-hover:scale-105 duration-300"
                />
            </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm text-blue-900 font-medium">{recipeDetailsData?.recipe?.publisher}</span>
                <h3 className="font-bold text-2xl truncate text-black">{recipeDetailsData?.recipe?.title}</h3>
                <div>
                        <button onClick={()=>handleAddToFavorite(recipeDetailsData?.recipe)} className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-medium bg-black text-white">
                           {
                            favoriteList.findIndex(item=>item.id === recipeDetailsData?.recipe?.id)!==-1 ? 'Remove from favorite' : 'Add to favorite'
                           }
                        </button>

                </div>
                <div>
                    <span className="text-2xl font-semibold text-black">Ingredients:</span>
                    <ul className="flex flex-col gap-3">

                        {

                            recipeDetailsData?.recipe?.ingredients.map(ingredients=><li>

                                <span  className="text-2xl font-semibold text-black">{ingredients.quantity}{ingredients.unit}</span>
                                <span  className="text-2xl font-semibold text-black">{ingredients.description}</span>
                            </li>)
                        }
                    </ul>
                
                </div>
            </div>

    </div>
}