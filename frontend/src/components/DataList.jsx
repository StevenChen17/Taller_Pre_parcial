import React from 'react';

const DataList = ({ items, currentEndpoint }) => {
    return (
        <div>
            <h2>Resultados ({currentEndpoint})</h2>
            <p>Total de Elementos: {items.length}</p>
            
            {items.length === 0 ? (
                <p>No se encontraron datos.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
                            <img 
                                src={item.picture} 
                                alt={item.nameBook} 
                                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                            />
                            <strong>ID:</strong> {item.id} <br/>
                            <strong>Nombre:</strong> {item.nameBook} <br/>
                            <strong>Género:</strong> {item.gender} <br/>
                            <strong>Activo:</strong> {item.isActive ? 'Sí' : 'No'} <br/>
                            <strong>Publicación:</strong> {item.datePublish}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataList;