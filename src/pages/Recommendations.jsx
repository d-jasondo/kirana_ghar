import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useAIRecs } from '../hooks/useAIRecs'

const Recommendations = () => {
  const { results, loading, error, getHybrid, getCF, getCBF } = useAIRecs()
  const [userId, setUserId] = useState(89)
  const [alpha, setAlpha] = useState(0.6)
  const [productId, setProductId] = useState(1)

  const runHybrid = async () => {
    await getHybrid(userId, 10, alpha)
  }
  const runCF = async () => {
    await getCF(userId, 10)
  }
  const runCBF = async () => {
    await getCBF(productId, 10)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Recommendations Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold mb-3">Hybrid (CF + CBF)</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">User ID</label>
              <input type="number" value={userId} onChange={(e)=>setUserId(parseInt(e.target.value||'0',10))}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Alpha (CF weight): {alpha}</label>
              <input type="range" min="0" max="1" step="0.1" value={alpha} onChange={(e)=>setAlpha(parseFloat(e.target.value))}
                className="w-full" />
            </div>
            <button onClick={runHybrid} className="w-full bg-primary text-white font-semibold py-2 rounded-lg">Run Hybrid</button>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold mb-3">Collaborative Filtering (CF)</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">User ID</label>
              <input type="number" value={userId} onChange={(e)=>setUserId(parseInt(e.target.value||'0',10))}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            </div>
            <button onClick={runCF} className="w-full bg-primary text-white font-semibold py-2 rounded-lg">Run CF</button>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold mb-3">Content-Based (CBF)</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Product ID</label>
              <input type="number" value={productId} onChange={(e)=>setProductId(parseInt(e.target.value||'0',10))}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            </div>
            <button onClick={runCBF} className="w-full bg-primary text-white font-semibold py-2 rounded-lg">Run CBF</button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommendations
