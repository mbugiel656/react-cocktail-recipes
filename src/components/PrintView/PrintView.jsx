import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { selectDrink, selectError, selectIsLoading } from "../../features/drink/drinkSlice"
import { retrieveDrinkProperties } from "../../utils/retrieveDrinkProperties"
import { 
    selectFontSizeType, 
    selectFontSizeValue, 
    selectIncludeImage, 
    setFontSizeType,
    setFontSizeValue, 
    toggleIncludeImage 
} from "../../features/print/printSlice"

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
    const dispatch = useDispatch()
    const fontSizeType = useSelector(selectFontSizeType)
    const fontSizeValue = useSelector(selectFontSizeValue)
    const includeImage = useSelector(selectIncludeImage)

    const options = {
        fontSize: ['small', 'medium', 'large']
    }

    const switchFontSize = (size) => {
        switch(size) {
            case 'small':
                dispatch(setFontSizeValue('0.8'))
                break
            case 'medium':
                dispatch(setFontSizeValue('1.0'))
                break
            case 'large':
                dispatch(setFontSizeValue('1.2'))
                break
        }
    }

    useEffect(() => {
        switchFontSize(fontSizeType)
    }, [])

    useEffect(() => {
        switchFontSize(fontSizeType)
    }, [fontSizeType])


    return (
        <div className="print-options">
            <div className="print-options__font-size d-flex align-items-center">
                <Select 
                    labelFor="font-size__label"
                    labelText="Font size:"
                    id="font-size__label"
                    className="mx-3 my-4"
                    name="font-size"
                    selectValue={fontSizeType}
                    onChange={(e) => dispatch(setFontSizeType(e.target.value))}
                    initialOptionText="Choose font size"
                    options={options.fontSize}
                />
            </div>
            <div className="print-options__image d-flex align-items-center">
                <Checkbox 
                    labelText="Include image:"
                    id="image__label"
                    className="mx-3 my-4"
                    isChecked={includeImage} 
                    onChange={() => dispatch(toggleIncludeImage())}
                />
            </div>
            <div className="print-options__print-document">
                <button>Print document</button>
            </div>
        </div>
    )
}

const PrintPreview = () => {
    const drink = useSelector(selectDrink)
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)


    return (
        <div id="print-preview" className="print-preview d-flex flex-column shadow p-3">
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
    const fontSizeValue = useSelector(selectFontSizeValue)
    const includeImage = useSelector(selectIncludeImage)


    return (
        <div className="preview-header d-flex flex-column">
            <div className="d-flex flex-row justify-content-start">
                <Logo />
            </div>
            <div className="d-flex flex-row justify-content-between" style={{ marginTop: '120px' }}>
                <div className="d-flex flex-column" style={{ fontSize: `${fontSizeValue}em` }}>
                    <h2 className="my-4"><b style={{ fontSize: `${fontSizeValue}em` }}>{name}</b></h2>
                    <p className="my-1"><b>Category: </b>{category}</p>
                    <p className="my-1"><b>Alcoholic: </b>{alcoholic}</p>
                    <p className="my-1"><b>Glass: </b>{glass}</p>
                </div>
                <div className="d-flex flex-column">
                    <img 
                        className="preview-header__image" 
                        src={imageUrl} 
                        alt={name}
                        style={{ visibility: includeImage ? 'visible' : 'hidden' }} 
                    />
                </div>
            </div>
            <Divider />
        </div>
    )
}

const PreviewBody = ({ ingredients, measures, instructions }) => {
    const fontSizeValue = useSelector(selectFontSizeValue)


    return (
        <div className="preview-body d-flex flex-column" style={{ fontSize: `${fontSizeValue}em` }}>
            <IconContext.Provider value={{ style: { marginRight: '6px' } }}>
                <h4>
                    <BsListCheck />
                    <b style={{ fontSize: `${fontSizeValue}em` }}>Ingredients</b>
                </h4>
                <Ingredients
                    ingredients={ingredients}
                    measures={measures}
                />
                <Divider />
                <h4>
                    <RiFileList3Line />
                    <b style={{ fontSize: `${fontSizeValue}em` }}>Instructions</b>
                </h4>
                <p>{instructions}</p>
            </IconContext.Provider>
        </div>
    )
}

export default PrintView