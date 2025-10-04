import express from 'express'

export const pagination = (page, limit = 5) => {
    const parsePage = parseInt(page) || 1;
    const parseLimit = parseInt(limit) || 5;

    const skip = (parsePage - 1) * parseLimit;
    return {skip, limit: parseLimit};
}