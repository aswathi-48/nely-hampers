import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (or Private depending on requirements, let's say Public for guest checkouts, but usually customer logs in)
export const createOrder = async (req, res) => {
  try {
    const {
      orderType,
      products,
      customItems,
      budget,
      totalAmount,
      deliveryDate,
      recipientName,
      customerPhone,
      deliveryAddress,
      giftMessage,
      specialInstructions
    } = req.body;

    if (products && products.length === 0 && customItems && customItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const orderNumber = 'NH-' + Date.now();

    const order = new Order({
      orderNumber,
      customer: req.user ? req.user._id : null, // If authenticated, attach user
      orderType,
      products,
      customItems,
      budget,
      totalAmount,
      deliveryDate,
      recipientName,
      customerPhone,
      deliveryAddress,
      giftMessage,
      specialInstructions,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('customer', 'id name email phone');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Admin or Owner)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('products.product')
      .populate('customItems.product');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


