const filters = 
{
    m_SearchText: '',
    m_SortBy: ''
}

const getFilters = () => filters

const setFilters = (i_Updates) =>
{
    if(typeof i_Updates.m_SearchText === 'string')
    {
        filters.m_SearchText = i_Updates.m_SearchText
    }
    if(typeof i_Updates.m_SortBy === 'string')
    {
        filters.m_SortBy = i_Updates.m_SortBy    
    }
}

export {getFilters, setFilters}