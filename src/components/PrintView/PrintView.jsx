import { useState } from "react"
import { useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { selectDrink, selectError, selectIsLoading } from "../../features/drink/drinkSlice"
import { retrieveDrinkProperties } from "../../utils/retrieveDrinkProperties"

import Checkbox from "../Checkbox/Checkbox"
import Divider from "../Divider/Divider"
import Header from "../Header/Header"
import Loader from "../Loader/Loader"
import Logo from "../Logo/Logo"
import Select from "../Select/Select"
import { Ingredients } from "../DrinkDetails/DrinkDetails"

import { BsListCheck } from 'react-icons/bs'
import { RiFileList3Line } from 'react-icons/ri'

import './PrintView.css'


const PrintView = () => {
    return (
        <div className="print-view d-flex flex-column">
            <Header text="Print Options" />

            <div className="d-flex flex-row justify-content-around my-5">
                <PrintOptions />
                <PrintPreview />
            </div>
        </div>
    )
}

const PrintOptions = () => {
    const [fontSize, setFontSize] = useState('')
    const [includeImage, setIncludeImage] = useState(true)

    const options = {
        fontSize: ['12', '16', '18']
    }


    return (
        <div className="print-options">
            <div className="print-options__font-size d-flex align-items-center">
                <Select 
                    labelFor="font-size__label"
                    labelText="Font size:"
                    id="font-size__label"
                    className="mx-3 my-4"
                    name="font-size"
                    selectValue={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    initialOptionText="Choose font size"
                    options={options.fontSize}
                    optionText="px"
                />
            </div>
            <div className="print-options__image d-flex align-items-center">
                <Checkbox 
                    labelText="Include image:"
                    id="image__label"
                    className="mx-3 my-4"
                    isChecked={includeImage} 
                    onChange={() => setIncludeImage(!includeImage)}
                />
            </div>
        </div>
    )
}

const PrintPreview = () => {
    const drink = useSelector(selectDrink)
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)

    return (
        <div className="print-preview d-flex flex-column shadow p-3">
            {isLoading && <Loader />}
            {error && error}
            {drink &&
                <>
                    <PreviewHeader
                        name={drink.strDrink}
                        category={drink.strCategory}
                        alcoholic={drink.strAlcoholic}
                        glass={drink.strGlass}
                        imageUrl={drink.strDrinkThumb}
                    />
                    <PreviewBody 
                        ingredients={retrieveDrinkProperties(drink, 'strIngredient')}
                        measures={retrieveDrinkProperties(drink, 'strMeasure')}
                        instructions={drink.strInstructions}
                    />
                </>
            }
        </div>
    )
}

const PreviewHeader = ({ name, category, alcoholic, glass, imageUrl }) => {
    return (
        <div className="preview-header d-flex flex-column">
            <div className="d-flex flex-row justify-content-start">
                <Logo />
            </div>
            <div className="d-flex flex-row justify-content-between" style={{ marginTop: '120px' }}>
                <div className="d-flex flex-column">
                    <h1 className="my-4"><b>{name}</b></h1>
                    <p><b>Category: </b>{category}</p>
                    <p><b>Alcoholic: </b>{alcoholic}</p>
                    <p><b>Glass: </b>{glass}</p>
                </div>
                <div className="d-flex flex-column">
                    <img 
                        className="preview-header__image" 
                        src={imageUrl} 
                        alt={name}
                        style={{  }} 
                    />
                </div>
            </div>
            <Divider />
        </div>
    )
}

const PreviewBody = ({ ingredients, measures, instructions }) => {
    return (
        <div className="preview-body d-flex flex-column">
            <IconContext.Provider value={{ style: { marginRight: '6px' } }}>
                <h4>
                    <BsListCheck />
                    <b>Ingredients</b>
                </h4>
                <Ingredients
                    ingredients={ingredients}
                    measures={measures}
                />
                <Divider />
                <h4>
                    <RiFileList3Line />
                    <b>Instructions</b>
                </h4>
                <p>{instructions}</p>
            </IconContext.Provider>
        </div>
    )
}

export default PrintView