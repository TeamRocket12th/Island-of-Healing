import { defineEventHandler, setResponseHeaders } from 'h3'

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET,POST',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*'
  })
})
