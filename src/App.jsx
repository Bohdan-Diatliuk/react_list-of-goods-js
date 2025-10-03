import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const handleSortAlphab = 'alphabet';
const handleSortByLength = 'length';

function getPreparedGoods(goods, { sortField, toggleReverse }) {
  const compators = {
    [handleSortAlphab]: (a, b) => a.localeCompare(b),
    [handleSortByLength]: (a, b) => a.length - b.length,
  };

  const comparator = compators[sortField] || (() => 0);

  const preparedGoods = sortField ? [...goods].sort(comparator) : [...goods];

  return toggleReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const [toggleReverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    toggleReverse,
  });

  function resetOrder() {
    setSortField('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== handleSortAlphab ? 'is-light' : ''}`}
          onClick={() => setSortField(handleSortAlphab)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField !== handleSortByLength ? 'is-light' : ''}`}
          onClick={() => setSortField(handleSortByLength)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${!toggleReverse ? 'is-light' : ''}`}
          onClick={() => setReverse(!toggleReverse)}
        >
          Reverse
        </button>
        {(toggleReverse || sortField !== '') && (
          <button
            type="button"
            className={`button is-danger ${sortField !== 'reset' ? 'is-light' : ''}`}
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
