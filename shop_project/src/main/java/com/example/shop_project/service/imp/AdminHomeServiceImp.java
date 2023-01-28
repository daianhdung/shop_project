package com.example.shop_project.service.imp;

import com.example.shop_project.dto.HeaderLayoutDTO;
import com.example.shop_project.repository.OrderRepository;
import com.example.shop_project.repository.ProductSizeRepository;
import com.example.shop_project.repository.UserRepository;
import com.example.shop_project.service.AdminHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminHomeServiceImp implements AdminHomeService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductSizeRepository productSizeRepository;

    @Override
    public HeaderLayoutDTO getHeaderLayout() {
        HeaderLayoutDTO headerLayoutDTO = new HeaderLayoutDTO();
        headerLayoutDTO.setNewCustomer(userRepository.countNowMonth());
        int newCustomerPreviousMonth = userRepository.countPreviousMonth();
        float diffNewCustomer = newCustomerPreviousMonth == 0 ? 0 :
                (headerLayoutDTO.getNewCustomer() - newCustomerPreviousMonth) * 100 / newCustomerPreviousMonth;
        headerLayoutDTO.setDiffNewCustomer(diffNewCustomer);

        headerLayoutDTO.setBillOrdered(orderRepository.countNowMonth());
        int billOrderedPreviousMonth = orderRepository.countPreviousMonth();
        float diffBillOrdered = billOrderedPreviousMonth == 0 ? 0 :
                (headerLayoutDTO.getBillOrdered() - billOrderedPreviousMonth) * 100 / billOrderedPreviousMonth;
        headerLayoutDTO.setDiffBillOrdered(diffBillOrdered);

        headerLayoutDTO.setBillSold(orderRepository.countNowMonthSold());
        int billSoldPreviousMonth = orderRepository.countPreviousMonthSold();
        float diffBillSold = billSoldPreviousMonth == 0 ? 0 :
                (headerLayoutDTO.getDiffBillSold() - billSoldPreviousMonth) * 100 / billSoldPreviousMonth;
        headerLayoutDTO.setDiffBillSold(diffBillSold);
        headerLayoutDTO.setRemainProduct(productSizeRepository.sumProductAmount());



        return headerLayoutDTO;
    }
}
