import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

interface FilterState {
    nev: string;
    nap: {
        hetfo: boolean,
        kedd: boolean,
        szerda: boolean,
        csutortok: boolean,
        pentek: boolean
    },
    szak: string[],
}

enum Napok {
    hetfo,
    kedd,
    szerda,
    csutortok,
    pentek,
}

enum FilterType {
    nev,
    hetfo,
    kedd,
    szerda,
    csutortok,
    pentek,
    szak
}

const FilterList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
`;

const FilterItem = styled.li`
    cursor: pointer;
    padding: 8px 10px;
    margin: 0px 10px;
    border-radius: 30px;
    background-color: #28A745;
    color: white;
`;


const Filters = () => {

    const [showFilters, setShowFilters] = useState<boolean>(false);

    const [filters, setFilters] = useState<FilterState>({
        nev: "",
        nap: {
            hetfo: false,
            kedd: false,
            szerda: false,
            csutortok: false,
            pentek: false,
        },
        szak: []
    });

    const changeShowFilter = () => {
        setShowFilters(!showFilters);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setFilters({...filters, nev: ""});
            return
        }
        setFilters(
            {...filters, nev: event.target.value}
        );
    }

    const onDayChange = (event: React.ChangeEvent<HTMLInputElement>, id: Napok) => {
        const { nap } = filters;
        switch (id) {
            case Napok.hetfo:
                nap.hetfo = event.target.checked;
                break;
            case Napok.kedd:
                nap.kedd = event.target.checked;
                break;
            case Napok.szerda:
                nap.szerda = event.target.checked;
                break;
            case Napok.csutortok:
                nap.csutortok = event.target.checked;
                break;
            case Napok.pentek:
                nap.pentek = event.target.checked;
                break;
        }
        setFilters({...filters, nap});
    }

    const onSzakSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
        const selectedOptions = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                console.log(options[i]);
                selectedOptions.push(options[i].value)
            }
        }

        setFilters({...filters, szak: selectedOptions});
    }

    const getActiveFilters = () => {
        const aktivSzurok : any[] = [];

        console.log(navigator);

        if (filters.nev !== "") {
            aktivSzurok.push(<FilterItem key="nev" onClick={() => removeFilter(FilterType.nev)} >Név: {filters.nev}</FilterItem>)
        }

        if (filters.nap.hetfo) {
            aktivSzurok.push(<FilterItem key="hetfo" onClick={() => removeFilter(FilterType.hetfo)} >Hétfő</FilterItem>)
        }
        if (filters.nap.kedd) {
            aktivSzurok.push(<FilterItem key="kedd" onClick={() => removeFilter(FilterType.kedd)} >Kedd</FilterItem>)
        }
        if (filters.nap.szerda) {
            aktivSzurok.push(<FilterItem key="szerda" onClick={() => removeFilter(FilterType.szerda)} >Szerda</FilterItem>)
        }
        if (filters.nap.csutortok) {
            aktivSzurok.push(<FilterItem key="csutortok" onClick={() => removeFilter(FilterType.csutortok)} >Csütörtök</FilterItem>)
        }
        if (filters.nap.pentek) {
            aktivSzurok.push(<FilterItem key="pentek" onClick={() => removeFilter(FilterType.pentek)} >Péntek</FilterItem>)
        }

        filters.szak.forEach(szak => {
            aktivSzurok.push(<FilterItem key={szak} onClick={() => removeFilter(FilterType.szak, szak)} >{szak}</FilterItem>)
        })

        if (aktivSzurok.length > 0) {
            return <div className="mt-3">
                        <h3>Aktív szűrők</h3>
                            <FilterList>
                                {aktivSzurok}
                            </FilterList>
                    </div>
        }
        return null;
    }

    const removeFilter = (type: FilterType, text?: string) => {
        switch (type) {
            case FilterType.nev:
                setFilters({...filters,nev: "",});
                break;
            case FilterType.hetfo:
                setFilters({...filters, nap: {...filters.nap, hetfo: false}});
                break;
            case FilterType.kedd:
                setFilters({...filters, nap: {...filters.nap, kedd: false}});
                break;
            case FilterType.szerda:
                setFilters({...filters, nap: {...filters.nap, szerda: false}});
                break;
            case FilterType.csutortok:
                setFilters({...filters, nap: {...filters.nap, csutortok: false}});
                break;
            case FilterType.pentek:
                setFilters({...filters, nap: {...filters.nap, pentek: false}});
                break;
            case FilterType.szak:
                const szakok = Object.assign([], filters.szak);
                const index = filters.szak.indexOf(text!)
                if (index != -1) {
                    szakok.splice(index, 1);
                }
                setFilters({...filters, szak: szakok});
                break;

            default:
                break;
        }
    }


    const ctrlText =  /mac/i.test(navigator.userAgent) ? "Cmd" : "Ctrl";

    const filter = showFilters ? <>
        <Form>
            <Form.Row>
                <Col>
                    <Form.Group controlId="nevFilter">
                        <Form.Label>Név</Form.Label>
                        <Form.Control type="text" placeholder="Név" onChange={onNameChange} value={filters.nev}></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <p>Napok</p>
                    <div>
                        <Form.Check
                            inline
                            label="Hétfő"
                            type='checkbox'
                            id='hetfo'
                            checked={filters.nap.hetfo}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.hetfo)}}
                        />
                        <Form.Check
                            inline
                            label="Kedd"
                            type='checkbox'
                            id='kedd'
                            checked={filters.nap.kedd}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.kedd)}}
                        />
                        <Form.Check
                            inline
                            label="Szerda"
                            type='checkbox'
                            id='szerda'
                            checked={filters.nap.szerda}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.szerda)}}
                        />
                        <Form.Check
                            inline
                            label="Csütörtök"
                            type='checkbox'
                            id='csutortok'
                            checked={filters.nap.csutortok}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.csutortok)}}
                        />
                        <Form.Check
                            inline
                            label="Péntek"
                            type='checkbox'
                            id='pentek'
                            checked={filters.nap.pentek}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onDayChange(event, Napok.pentek)}}
                        />
                    </div>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="szakFilter">
                        <Form.Label>Szak</Form.Label>
                        <Form.Control as="select" multiple onChange={onSzakSelected} value={filters.szak}>
                            <option value="ginf">Gazdinfo</option>
                            <option value="hr">HR</option>
                            <option value="tv">TV</option>
                            <option value="gm">GM</option>
                        </Form.Control>
                        <Form.Text className="text-muted">Több kiválasztásához nyomj {ctrlText}-t</Form.Text>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Form>
        {getActiveFilters()}
    </>
    : null;

    const arrow = showFilters ? <span> &#x25B2; </span> : <span> &#x25BC; </span>;

    return (
        <div className="mt-3">
            <h2 onClick={changeShowFilter} style={{cursor: "pointer", userSelect: "none"}}>Szűrők {arrow}</h2>
            { filter }
        </div>
    );
}

export default Filters;